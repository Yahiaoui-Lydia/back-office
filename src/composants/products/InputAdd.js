import React, { useState } from "react";

function InputAdd(props) {
  const [inputList, setInputList] = useState([{ key: "", value: "" }]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    props.list(inputList)
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    props.list(inputList)
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { key: "", value: "" }]);
    props.list(inputList)
  };

  return (
      <>
    <div className="overflow-auto"  style={{height:'200px'}} >
    
      {inputList.map((x, i) => {
        return (
          <div className="box" key={i}>
            <input
              name="key"
              placeholder="caracterestique"
              value={x.key}
              onChange={e => handleInputChange(e, i)}
            />
            <input
              className="ml10"
              name="value"
              placeholder="sa valeur"
              value={x.value}
              onChange={e => handleInputChange(e, i)}
            />
            <div className="btn-box">
              {inputList.length !== 1 && <button
                className="mr10"
                onClick={() => handleRemoveClick(i)}>Remove</button>}
              {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
            </div>
          </div>
        );
      })}
  
    </div>
    </>
  );
}

export default InputAdd;