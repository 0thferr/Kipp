# Kipp — Versão 2.0

A grade em `/` lista as câmeras configuradas. O link **Abrir câmera** abre a página individual em `/camera/:id`. O player usa hls.js ou, em navegadores compatíveis, a reprodução HLS nativa.

## Executar

```bash
npm ci
npm run dev
```

Acesse o endereço exibido pelo Vite. Para usar outra transmissão na sua máquina, defina `VITE_HLS_STREAM_URL` em `.env.local` e reinicie o servidor. Use uma URL HLS acessível ao navegador. Variáveis com prefixo `VITE_` ficam disponíveis no código entregue ao navegador.

## Validar

```bash
npm run lint
npm run test:unit
npm run build
```

Para os testes de navegação, deixe o servidor Vite rodando em `http://127.0.0.1:5173` e execute `npm run test:e2e` em outro terminal. O Cypress intercepta as solicitações de playlists HLS durante os testes. Se o executável do Cypress ainda não estiver instalado, execute `npm exec cypress install`.
