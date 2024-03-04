import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CommonModule } from "src/common/common.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [CommonModule],
    providers: [AuthService],
    controllers: [],
    exports: [AuthService]
})

export class AuthModule {}