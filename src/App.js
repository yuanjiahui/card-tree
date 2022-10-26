// import logo from "./logo.svg";
import { useState } from "react";
import { Button } from "antd";
import "./App.css";
import Tree from "./components/tree";

const oriTreeData = [
  {
    key: "0-0",
    title: "parent 1",
    children: [
      {
        key: "0-0-0",
        title: "parent 1-1",
        children: [{ key: "0-0-0-0", title: "parent 1-1-0" }],
      },
      {
        key: "0-0-1",
        title: "parent 1-2",
        children: [
          { key: "0-0-1-0", title: "parent 1-2-0", disableCheckbox: false },
          { key: "0-0-1-1", title: "parent 1-2-1" },
          { key: "0-0-1-2", title: "parent 1-2-2" },
          { key: "0-0-1-3", title: "parent 1-2-3" },
          { key: "0-0-1-4", title: "parent 1-2-4" },
        ],
      },
    ],
  },
  {
    key: "0-1",
    title: "parent 2",
    children: [
      {
        key: "0-1-0",
        title: "parent 2-1",
        children: [{ key: "0-1-0-0", title: "parent 2-1-0" }],
      },
      {
        key: "0-1-1",
        title: "parent 2-2(单选状态无法点击)",
        children: [
          { key: "0-1-1-0", title: "parent 2-2-0" },
          { key: "0-1-1-1", title: "parent 2-2-1" },
        ],
      },
    ],
  },
];

//互斥节点配置
const mutexMap = { "0-1-1-0": ["0-1-1-1"], "0-1-1-1": ["0-1-1-0"] };

function mutexNode(treeData, keys = [], checked = true) {
  treeData.forEach((element) => {
    if (keys.includes(element.key)) {
      element.disableCheckbox = checked;
    }
    if (element.children) {
      mutexNode(element.children, keys, checked);
    }
  });
}

//单选节点
// const singleNodeKeys = [];

function App() {
  const [treeData, setTreeData] = useState(oriTreeData);
  const [keys, setKeys] = useState([]);
  return (
    <div className="App">
      <Button
        onClick={() => {
          setKeys(["0-0"]);
        }}
      >
        Tree赋值
      </Button>
      <Tree
        treeData={treeData}
        checkedKeys={keys}
        onChange={(keys, checkedItem, checked) => {
          let nKeys = [...keys];

          if (checkedItem.key === "0-1-1") {
            return;
          }
          /**
           * 处理互斥数据
           * 1.根据当前节点的状态将节点禁用或者启用
           * 2.将已经选中的key排除掉
           */
          const mutexKeys = mutexMap[checkedItem.key];
          if (mutexKeys) {
            const nTreeData = [...treeData];
            mutexNode(nTreeData, mutexKeys, checked);
            setTreeData(nTreeData);
            if (checked) {
              nKeys = keys.filter((i) => !mutexKeys.includes(i));
            }
          }
          console.log(nKeys);
          setKeys(nKeys);
        }}
      />
    </div>
  );
}

export default App;
