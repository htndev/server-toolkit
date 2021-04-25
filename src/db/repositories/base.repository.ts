import { Repository } from 'typeorm';

export class BaseRepository<T> extends Repository<T> {
  async isExists(query: Partial<T>): Promise<boolean> {
    try {
      await this.findOneOrFail(query);

      return true;
    } catch {
      return false;
    }
  }
}
