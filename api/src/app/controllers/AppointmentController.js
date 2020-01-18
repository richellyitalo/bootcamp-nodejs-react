import * as Yup from 'yup';
import { isBefore, parseISO, startOfHour, format, subHours } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';
import Notification from '../../database/schemas/Notification';
import CancelationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      limit: 2,
      offset: (page - 1) * 2,
      attributes: ['id', 'date', 'past', 'cancelable'],
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(appointments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number()
        .required()
        .notOneOf([req.userId], 'Selecione um fornecedor diferente'),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos.' });
    }

    const { provider_id, date } = req.body;

    const isProvider = await User.findOne({
      where: {
        id: provider_id,
        provider: true,
      },
    });

    if (!isProvider) {
      return res.status(401).json({ error: 'Provider inválido.' });
    }

    /**
     * Verifica se data é anterior a atual
     */
    const hoursStart = startOfHour(parseISO(date));
    if (isBefore(hoursStart, new Date())) {
      return res
        .status(400)
        .json({ error: 'Datas passadas não são permitidas.' });
    }

    /**
     * Verifica disponibilidade de agendamento
     */
    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hoursStart,
      },
    });
    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Horário indisponível para esse fornecedor.' });
    }

    const { name: userName } = await User.findByPk(req.userId);
    const formattedDate = format(
      hoursStart,
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      { locale: ptBR }
    );

    await Notification.create({
      content: `Novo agendamento de ${userName} para ${formattedDate}`,
      user: provider_id,
    });

    const appointment = await Appointment.create({
      provider_id,
      user_id: req.userId,
      date,
    });

    return res.json(appointment);
  }

  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    if (appointment.provider_id !== req.userId) {
      return res
        .status(401)
        .json({ error: 'Você não possui permissões sobre esse agendamento.' });
    }

    const dateWithSub = subHours(appointment.date, 2);

    if (isBefore(dateWithSub, new Date())) {
      return res.status(401).json({
        error:
          'Só é permitido o cancelamento até 2 horas antes da data marcada.',
      });
    }

    appointment.canceled_at = new Date();
    await appointment.save();

    /**
     * Notificação via email
     */
    await Queue.add(CancelationMail.key, {
      appointment,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
