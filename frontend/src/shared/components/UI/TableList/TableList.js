import React from "react";
import './TableList.css'

const TableList = (props) => {
  const {resume, rowKey, headers, data} = props;

  return (
    <div className="table-list__wrapper">
     <label> {resume} </label>
     <table className={`table-list__table ${props.className}`}>
        <thead>
          <tr key={rowKey}>
            {headers.map((key, i) => (
              <th key={i}>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((item, j) => (
            <tr key={j}>
              {Object.values(item).map((val, k) => (
                <td key={k}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableList;