import React, { useState } from "react";
import axiosWithAuth from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        // setColorToEdit(initialColor)
        console.log("Color saved:", res);
      })
      .catch(err => console.log('saveEdit FAILED:', err))
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        console.log('Color deleted:', res)
      })
      .catch(err => console.log('deleteColor FAILED:', err))
  }

  const addColor = e => {
    e.preventDefault();
    setNewColor({ ...newColor });
    axiosWithAuth()
      .post("/colors", newColor)
      .then(res => {
        setNewColor(initialColor)
        console.log('Color added:', res)
      })
      .catch(err => console.log('addColor FAILED:', err))
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
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
        <form onSubmit={addColor}>
          <legend>add color</legend>
          <label>
            color name:
            <input onChange={e => setNewColor({ ...newColor, color: e.target.value })} value={newColor.color} />
          </label>
          <label>
            hex code:
            <input
              type="color"
              onChange={e =>
                setNewColor({
                  ...newColor,
                  code: { hex: e.target.value },
                })
              }
              value={newColor.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">Add Color</button>
          </div>
        </form>
    </div>
  );
};

export default ColorList;
