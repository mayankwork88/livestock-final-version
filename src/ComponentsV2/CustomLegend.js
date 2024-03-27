import React from 'react';

const CustomLegend = ({payload}) => {
      return (
        <ul style={{ display: "flex", gap: "10px" }}>
          {payload.map((el, index) => (
            <li
              key={`item-${index}`}
              style={{
                display: "flex",
                gap: "5px",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              {el?.type === "line" ? (
                <>
                  <span
                    style={{
                      width: "8px",
                      height: "2px",
                      background: el.color,
                      borderRadius: "50px",
                    }}
                  ></span>
                  <span
                    style={{
                      width: "8px",
                      height: "2px",
                      background: el.color,
                      borderRadius: "50px",
                    }}
                  ></span>
                </>
              ) : (
                <span
                  style={{
                    width: "15px",
                    height: "15px",
                    background: el.color,
                    borderRadius: "50px",
                  }}
                ></span>
              )}
              <span style={{ fontSize: "14px", textTransform: "capitalize" }}>
                {el.value}
              </span>
            </li>
          ))}
        </ul>
      );
}

export default CustomLegend;
