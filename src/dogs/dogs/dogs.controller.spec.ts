import { Test, TestingModule } from '@nestjs/testing';
import { DogsController } from './dogs.controller'; 
import { DogsService } from './dogs.service';
// import { DogDTOStub } from '../stubs/dog.dto.stub';

describe('DogsController', () => {
  let controller: DogsController;
  let service: DogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DogsService],
      controllers: [DogsController],
    }).compile();

    controller = module.get<DogsController>(DogsController);
    service = module.get<DogsService>(DogsService);
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
        const result = [
          {
              "id": 0,
              "name": "bob",
              "age": 1
          },
          {
              "id": 1,
              "name": "doggy",
              "age": 5
          },
          {
              "id": 2,
              "name": "doggo",
              "age": 5
          },
          {
              "id": 3,
              "name": "dog",
              "age": 12
          },
      ];
        expect(service.getAllDogs()).toStrictEqual(result);
    });
  })
});