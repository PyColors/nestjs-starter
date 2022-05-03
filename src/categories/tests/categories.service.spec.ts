import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import Category from '../entities/category.entity';
import { CategoriesService } from '../categories.service';

describe('The CategoriesService', () => {
  let categoriesService: CategoriesService;
  let findOne: jest.Mock;
  beforeEach(async () => {
    findOne = jest.fn();
    const module = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useValue: {
            findOne
          }
        }
      ],
    })
      .compile();
    categoriesService = await module.get(CategoriesService);
  })
  describe('when getting a category', () => {
    describe('and the category ID is matched', () => {
      let category: Category;
      beforeEach(() => {
        category = new Category();
        findOne.mockReturnValue(Promise.resolve(category));
      })
      it('should return the category', async () => {
        const fetchedCategory = await categoriesService.getCategoryById(44244);
        expect(fetchedCategory).toEqual(category);
      })
    })
    describe('and the category ID is not matched', () => {
      beforeEach(() => {
        findOne.mockReturnValue(undefined);
      })
      it('should throw an error', async () => {
        await expect(categoriesService.getCategoryById(44244)).rejects.toThrow();
      })
    })
  })
});
