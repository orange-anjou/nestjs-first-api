import { Test, TestingModule } from '@nestjs/testing';
import { DogsController } from './dogs.controller';
import { Dog, DogsService } from './dogs.service';

describe('DogsController', () => {
  let controller: DogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DogsController],
    }).compile();

    controller = module.get<DogsController>(DogsController);
  });

  /*
  it('get all dogs', () => {
    const result: Dog = { id:4, name: "bob", age: 3};
    jest.spyOn(DogsService, 'getAllDogs').mockImplementation(() => result);

    expect(DogsController.getAllDogs()).toBe(result);
  }); */
});
