import { beforeEach, describe } from "node:test";
import { UsersService } from "./users.service";
import { USER_MODEL , User } from "./schema/user.schema";
import { Model } from "mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";

describe("UserService", () => {
    let userService: UsersService;
    let model: Model<User>;

    const mockUserService = {
        findOne: jest.fn(),
      };
    const mockUser = {
        _id: 1,
        firstname: 'Ranjana',
        lastname: 'Rawat',
        email: 'ranajna@gmail.com',
        password: '4143141414',
    };

    beforeEach(async () => {
        const  module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getModelToken(User.name),
                    useValue: mockUserService,
                  },
            ],
        }).compile();
        console.log("module--------", module)
        userService = module.get<UsersService>(UsersService);
        model = module.get<Model<User>>(getModelToken(User.name));
    });
 
    it('should be defined', () => {
        expect(UsersService).toBeDefined();
    });
    

    describe('findOne', () => {
        it('should return an object of User', async () => {
            console.log("mockUser._id", mockUser._id);
            jest.spyOn(model,'findOne').mockResolvedValue(mockUser)
            const result = await userService.findOne(mockUser._id);
            expect(model.findOne).toHaveBeenCalledWith(mockUser._id);
            expect(result).toEqual(mockUser);
        });
    });
});
