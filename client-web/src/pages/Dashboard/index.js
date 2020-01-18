import React from 'react';
import api from '~/services/api';

export default function index() {
  api.get('appointments');
  return <div>Dashboard</div>;
}
