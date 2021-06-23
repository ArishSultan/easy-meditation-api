import { Body, Controller, Get, Post } from '@nestjs/common';
import { AboutService } from './about.service';

@Controller('about')
export class AboutController {
  constructor(private service: AboutService) {}

  @Post()
  postAbout(@Body() data: { value: string }) {
    console.log(data.value);
    this.service.saveAbout(data.value);
  }

  @Get()
  getAbout(): string {
    return this.service.readAbout();
  }

  @Post('contact-us')
  postContactUs(@Body() data: { value: string }) {
    this.service.saveContactUs(data.value);
  }

  @Get('contact-us')
  getContactUs(): string {
    return this.service.readContactUs();
  }
}
