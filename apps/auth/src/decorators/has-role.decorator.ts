import { SetMetadata } from '@nestjs/common';

export const HasRoles = (role: string) => SetMetadata('roles', role);
