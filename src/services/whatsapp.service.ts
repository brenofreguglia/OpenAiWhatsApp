import { Injectable, OnModuleInit } from '@nestjs/common';
import Whatsapp from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

@Injectable()
export class WhatsappService implements OnModuleInit {
  client: Whatsapp.Client;
  eventos: Map<Whatsapp.Events, (...args) => void> = new Map();
  onModuleInit() {
    this.client = new Whatsapp.Client({
      authStrategy: new Whatsapp.LocalAuth(),
      puppeteer: {
        executablePath:
          'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      },
    });

    this.client.on('qr', (qr) => {
      // console.log('qr -->', qr);
      qrcode.generate(qr, { small: true });
    });

    this.client.on('ready', () => {
        this.AtivarEvento();
    });

    this.client.initialize();
  }

  inscreverEvento(evento: Whatsapp.Events, callback) {
    this.eventos.set(evento, callback);
  }

  AtivarEvento() {
    this.eventos.forEach((callback, evento) => {
      this.client.on(evento, callback);
    });
  }
}
