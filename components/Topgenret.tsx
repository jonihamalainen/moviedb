interface Props {
    genret: string
}

function Topgenret ({genret}: Props): React.ReactElement {
    return (
        <tr className="border-2 border-black">
          <td className="border-2 border-black">{genret}</td>
        </tr>
      );
}

export default Topgenret;