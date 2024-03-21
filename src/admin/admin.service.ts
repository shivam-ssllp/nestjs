import { Injectable } from '@nestjs/common';
import { UserType } from 'src/auth/roles';
import { Common } from 'src/common/common.service';
import { DbService } from 'src/db/db.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly model: DbService,
    private readonly common: Common,
  ) { }

  async createAdmin() {
    try {
      let pass = 'Admin@1234'
      let hash = await this.common.encriptPass(pass);
      let data = {
        first_name: 'super',
        last_name: 'admin',
        email: 'admin@gmail.com',
        password: hash,
        user_type: UserType.Superadmin
      }
      let query = { email: data.email };
      let admin = await this.model.users.findOne(query);

      if (admin) {
        console.log({ message: "--------->>>> admin already created" });
        return
      }
      await this.model.users.create(data)
      console.log({ message: "<<<<<--------->>>> admin created" });
      return
    } catch (error) {
      console.log(error);
      throw error
    }
  }
}

