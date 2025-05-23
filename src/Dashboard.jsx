// Forçar novo deploy Netlify
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [authUrl, setAuthUrl] = useState('');

  const anuncios = [
    {
      imagem: 'https://via.placeholder.com/50',
      titulo: 'Plafon de Madeira 35cm',
      margem: '25%',
      visitas: 432,
      vendas: 36,
      lucroMedio: 'R$ 18,00',
      lucroTotal: 'R$ 648,00'
    },
    {
      imagem: 'https://via.placeholder.com/50',
      titulo: 'Luminária Redonda 30cm',
      margem: '30%',
      visitas: 318,
      vendas: 28,
      lucroMedio: 'R$ 22,50',
      lucroTotal: 'R$ 630,00'
    },
    {
      imagem: 'https://via.placeholder.com/50',
      titulo: 'Plafon Quadrado Freijó',
      margem: '20%',
      visitas: 210,
      vendas: 19,
      lucroMedio: 'R$ 15,00',
      lucroTotal: 'R$ 285,00'
    }
  ];

  useEffect(() => {
    const fetchAuthUrl = async () => {
      try {
        const response = await axios.get(
          'https://dsseller-backend-final.onrender.com/api/mercadolivre/auth-url'
        );
        setAuthUrl(response.data.authUrl);
      } catch (error) {
        console.error('Erro ao obter URL de autenticação:', error);
      }
    };

    fetchAuthUrl();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-50 p-8 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Botão Conectar com Mercado Livre */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold flex items-center gap-2">
            <span role="img" aria-label="ícone">📊</span>
            Na Aba <span className="text-blue-700">Anúncios</span>
          </h2>
          <a
            href={authUrl}
            class
