import Table from "react-bootstrap/Table";
function Details(props) {
  const { posts } = props;
  return (
    // <Table striped size="sm">
      <tbody>
        <tr>
          <th>{posts.awardYear}</th>
          <th>{posts.category.en}</th>
          <th>{posts.categoryFullName.no}</th>
          <th>{posts.dateAwarded}</th>
          <th>{posts.prizeAmount}</th>
        </tr>
      </tbody>
    // </Table>
  );
}
export default Details;
