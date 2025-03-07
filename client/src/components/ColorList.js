import React, { useState } from "react";
import { axiosWithAuth } from "./axiosWithAuth";


const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
  
    setEditing(true);
    setColorToEdit(color);
  };

  const addColor = e => {
    axiosWithAuth().post(`http://localhost:5000/api/colors/`, colorToAdd)
      .then(res => {
       
        localStorage.setItem('id', res.data.payload)
       
      })
      .catch(err => console.log(err.response));
  };

  const saveEdit = e => {
    axiosWithAuth().put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        setEditing(false);
        let newColors = colors.map(color => {
          if(color.id === colorToEdit) return colorToEdit;
          else return color
        });
        updateColors(newColors);
      })
      .catch(err => console.log(err.response));
  };

  const deleteColor = color => {
    axiosWithAuth().delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => window.location.reload())
      .catch(err => console.log(err.response));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
          <form onSubmit={addColor}>
            <legend>add color</legend>
            <label>
              color name:
              <input
                onChange={e => 
                  setColorToAdd({ ...colorToAdd, color: e.target.value })
              }
              value={colorToAdd.color}
              />
            </label>
            <label>
              hex code:
              <input
                onChange={e =>
                  setColorToAdd({
                    ...colorToAdd,
                    code: { hex: e.target.value }
                  })
                }
                value={colorToAdd.code.hex}
                />
            </label>
            <div className="button-row">
              <button type="submit">add color</button>
            </div>
          </form>
    </div>
  );
};

export default ColorList;
