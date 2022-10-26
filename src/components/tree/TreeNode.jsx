import { useContext } from "react";
import { Checkbox } from "antd";
import { TreeContext } from "./index";

export const ICheckBox = ({ data }) => {
  const context = useContext(TreeContext);

  const onChange = (e) => {
    context.onCheck(data, e.target.checked);
  };

  const checked = context.checkedKeys.includes(data.key);
  const indeterminate = context.halfCheckedKeys.includes(data.key);
  return (
    <Checkbox
      value={data.key}
      checked={checked}
      onChange={onChange}
      indeterminate={indeterminate}
      disabled={data.disableCheckbox}
    >
      {data.title}
    </Checkbox>
  );
};

const Node = ({ data }) => {
  if (data?.children) {
    return (
      <div>
        <ICheckBox data={data} />
        {data.children.map((i) => (
          <Node key={i.key} data={i} />
        ))}
      </div>
    );
  }
  return <ICheckBox data={data} />;
};

export default Node;
