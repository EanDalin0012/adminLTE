export class Store {
  private static list = new Map<string, any>();

  get(key: string) {
    return Store.list.get(key);
  }

  set(key: string, data: any){
    Store.list.set(key, data);
  }
}
