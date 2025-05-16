import { WatchedList } from "./watched-list";

class NumberWatchedList extends WatchedList<number> {
  compareItems(a: number, b: number): boolean {
    return a === b;
  }
}

describe("Watched List", () => {
  it("should set initial items for the watched list", () => {
    const list = new NumberWatchedList([1, 2, 3]);

    expect(list.currentItems).toEqual([1, 2, 3]);
    expect(list.currentItems).toHaveLength(3);
  });

  it("should add new items to the watched list", () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.add(4);

    expect(list.currentItems).toEqual([1, 2, 3, 4]);
    expect(list.currentItems).toHaveLength(4);
    expect(list.getNewItems()).toEqual([4]);
  });

  it("should remove items from the watched list", () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.remove(2);

    expect(list.currentItems).toEqual([1, 3]);
    expect(list.currentItems).toHaveLength(2);
    expect(list.getRemovedItems()).toEqual([2]);
  });

  it("should restore a previously removed item to the watched list", () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.remove(2);

    list.add(2);

    expect(list.currentItems).toEqual([1, 3, 2]);
    expect(list.currentItems).toHaveLength(3);
    expect(list.getRemovedItems()).toEqual([]);
    expect(list.getNewItems()).toEqual([]);
  });

  it("should update items from the watched list", () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.update([1, 3, 5])

    expect(list.currentItems).toEqual([1, 3, 5]);
    expect(list.currentItems).toHaveLength(3);
    expect(list.getRemovedItems()).toEqual([2]);
    expect(list.getNewItems()).toEqual([5]);
  });
});
