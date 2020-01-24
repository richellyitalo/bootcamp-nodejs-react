import React, { useState, useMemo } from 'react';
import { format, addDays, subDays } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { Container, Time } from './styles';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  function handleDayPrev() {
    setDate(subDays(date, 1));
  }

  function handleDayNext() {
    setDate(addDays(date, 1));
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={handleDayPrev}>
          <MdChevronLeft size={36} color="#fff" />
        </button>
        <strong>{dateFormatted}</strong>
        <button type="button" onClick={handleDayNext}>
          <MdChevronRight size={36} color="#fff" />
        </button>
      </header>

      <ul>
        <Time past>
          <strong>08:00</strong>
          <span>Nome do cara</span>
        </Time>
        <Time available>
          <strong>08:00</strong>
          <span>Nome do cara</span>
        </Time>
        <Time>
          <strong>08:00</strong>
          <span>Nome do cara</span>
        </Time>
      </ul>
    </Container>
  );
}
