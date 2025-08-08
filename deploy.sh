#!/bin/bash

# Entrar na pasta do código
cd /code

# Baixar dependências
npm install

# Gerar a versão de produção
npm run build

# Iniciar o servidor
npm run start
