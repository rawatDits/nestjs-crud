import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
    async getCommon():Promise <string>{
        return "This is common function"
    }
}
