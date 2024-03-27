export const renderLegend = (legends) => {

    return (
      <ul style={{ display: "flex", gap: "10px" }}>
        {legends?.map((el, index) => (
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
  };