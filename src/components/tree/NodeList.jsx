import { Card } from "antd";
import TreeNode, { ICheckBox } from "./TreeNode";

const NodeList = ({ treeData }) => {
  return treeData.map((i) => {
    return (
      <Card title={<ICheckBox data={i} />} key={i.key}>
        {i.children.map((i) => (
          <TreeNode data={i} />
        ))}
      </Card>
    );
  });
};

export default NodeList;
