import React, { useEffect, useState } from "react";
import NodeList from "./NodeList";
import { conductCheck } from "./utils/conductUtil.js";
import { convertDataToEntities } from "./utils/treeUtil";

export const TreeContext = React.createContext({});

const TreeIndex = (props) => {
  const [oriCheckedKeys, setCheckedKeys] = useState([]);
  const [halfCheckedKeys, setHalfCheckedKeys] = useState([]);
  const [keyEntities] = useState(
    convertDataToEntities(props.treeData, {}).keyEntities
  );

  useEffect(() => {
    const conductKeys = conductCheck(props.checkedKeys, true, keyEntities);
    setCheckedKeys(conductKeys.checkedKeys);
    setHalfCheckedKeys(conductKeys.halfCheckedKeys);
  }, [props.checkedKeys, keyEntities]);

  const onCheck = (data, checked) => {
    // Always fill first
    let { checkedKeys, halfCheckedKeys } = conductCheck(
      [...oriCheckedKeys, data.key],
      true,
      keyEntities
    );

    // console.log("222", checkedKeys, halfCheckedKeys);

    // If remove, we do it again to correction
    if (!checked) {
      const keySet = new Set(checkedKeys);
      keySet.delete(data.key);
      ({ checkedKeys, halfCheckedKeys } = conductCheck(
        Array.from(keySet),
        { checked: false, halfCheckedKeys },
        keyEntities
      ));
    }

    //处理互斥节点
    // if (checked && data.mutexKeys) {
    //   const keySet = new Set(checkedKeys);
    //   data.mutexKeys.forEach((i) => keySet.delete(i));

    //   ({ checkedKeys, halfCheckedKeys } = conductCheck(
    //     Array.from(keySet),
    //     { checked: false, halfCheckedKeys },
    //     keyEntities
    //   ));
    //   keyEntities[data.mutexKeys[0]].disableCheckbox = true;
    //   console.log("mutexKeys", keyEntities[data.mutexKeys[0]]);
    // }

    // console.log(checkedKeys, halfCheckedKeys);
    if (props.checkedKeys) {
      props.onChange(checkedKeys, data, checked);
      return;
    }
    setCheckedKeys(checkedKeys);
    setHalfCheckedKeys(halfCheckedKeys);
  };
  return (
    <TreeContext.Provider
      value={{ checkedKeys: oriCheckedKeys, halfCheckedKeys, onCheck }}
    >
      <NodeList treeData={props.treeData} />
      <div>
        checkedKeys:{JSON.stringify(oriCheckedKeys)}
        <br />
        halfCheckedKeys:{JSON.stringify(halfCheckedKeys)}
      </div>
    </TreeContext.Provider>
  );
};

export default TreeIndex;
