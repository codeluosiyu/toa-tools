/**
 * 扁平数据结构转Tree
 * @param items
 * @param childId
 * @param parentId
 * @returns
 */
function arrayToTree(items, childId, parentId) {
  const result = [];
  const itemMap = {}; //
  for (const item of items) {
    const id = item[childId];
    const pid = item[parentId];

    if (!itemMap[id]) {
      itemMap[id] = {
        children: [],
      };
    }

    itemMap[id] = {
      ...item,
      children: itemMap[id]["children"],
    };

    const treeItem = itemMap[id];

    if (pid === 0) {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        };
      }
      itemMap[pid].children.push(treeItem);
    }
  }
  return result;
}
