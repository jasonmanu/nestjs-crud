import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class ReadUserDto implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  // not readable
  password: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
