import { useState } from "react";
import { data } from "../../constants/folderStructure";
// import { DispatchContext, UserContext } from "../../App";

export default function FolderStructure() {
  // const state = useContext(UserContext);
  // const dispatch = useContext(DispatchContext);

  const FileNode = ({ node, depth }) => {
    const [expanded, setExpanded] = useState(false);
    const isFolder = "children" in node;
    return (
      <>
        <p
          onClick={() => {
            if (isFolder) {
              setExpanded(!expanded);
            }
          }}
          style={{
            fontWeight: isFolder ? 900 : 500,
            paddingLeft: depth * 20 + "px",
            cursor: "pointer",
          }}
        >
          {isFolder ? (
            expanded ? (
              <span>&#8595; {node.name}</span>
            ) : (
              <span>&#8594; {node.name}</span>
            )
          ) : (
            <span> - {node.name}</span>
          )}
        </p>
        {isFolder && expanded
          ? node.children.map((n) => <FileNode depth={depth + 1} node={n} />)
          : null}
      </>
    );
  };
  return (
    <>
      {/* {state.user} */}
      {/* <button
        onClick={() => dispatch({ type: "SET_USER", payload: "Krishna" })}
      >
        Set User
      </button> */}
      {data.map((n) => {
        return <FileNode node={n} depth={0} />;
      })}
    </>
  );
}
