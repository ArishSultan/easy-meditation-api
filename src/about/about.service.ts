import { readFileSync, writeFileSync, existsSync } from 'fs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AboutService {
  private about: string;
  private contactUs: string;

  constructor() {
    if (existsSync('about_file.txt')) {
      this.about = readFileSync('about_file.txt', 'utf-8');
    }
    if (existsSync('contact_us_file.txt')) {
      this.contactUs = readFileSync('contact_us_file.txt', 'utf-8');
    }
  }

  saveAbout(value: string): void {
    writeFileSync('about_file.txt', value);
    this.about = value;
  }

  readAbout(): string {
    return this.about;
  }

  readContactUs(): string {
    return this.contactUs;
  }

  saveContactUs(value: string): void {
    writeFileSync('contact_us_file.txt', value);
    this.contactUs = value;
  }
}
