import { FindOptionsWhere, Repository } from 'typeorm'

export const repositoryBase = <T extends { id: number }>(repository: Repository<T>) => {
  type DataOptions = FindOptionsWhere<T>

  return {
    findAll: (where: DataOptions = {}) => {
      return repository.find({ where })
    },
    findPagination: async ({ page: currentPage = 1, limit: perPage = 15, ...where }: Partial<T> & { page?: number, limit?: number } = {}) => {
      const [items, total] = (await repository.findAndCount({
        skip: (currentPage - 1) * perPage,
        take: perPage,
        where: where as DataOptions,
      }))

      const lastPages = Math.ceil(total / perPage);

      return { items, total, lastPages, perPage, currentPage }
    },
    findById: (id: number) => {
      return repository.findOneBy({ id } as DataOptions);
    },
    create: async (data: Partial<T>) => {
      return repository.save(repository.create(data as T))
    },
    update: async (id: number, data: Partial<T>) => {
      const entity = await repository.findOneBy({ id } as DataOptions);
      if (!entity) {
        throw new Error('Entity not found');
      }
      repository.merge(entity, data as T);
      return repository.save(entity);
    },
    delete: async (id: number) => {
      const result = await repository.delete(id);

      if (result.affected === 0) {
        throw new Error('Entity not found');
      }
      return result;
    }
  }
}
