import { Test, TestingModule } from '@nestjs/testing';
import { DogsController } from './dogs.controller'; 
// import { DogDTOStub } from '../stubs/dog.dto.stub';

describe('DogsController', () => {
  let controller: DogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DogsController],
    }).compile();

    controller = module.get<DogsController>(DogsController);
  });

  /**
   * Testing that the controller is defined
   */
  it('should be defined', () => {
    expect(controller).toBeDefined();
  })

  /**
   * Testing GET /dogs
   */
  describe('getAllDogs', () => {
    it('should get all dogs', () => {
        const result = [];
        expect(controller.getAllDogs()).toBe(result);
    });
  })
});