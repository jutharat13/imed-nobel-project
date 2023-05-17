import Table from "react-bootstrap/Table";
function Details(props) {
  const { posts } = props;
  return (
    // < striped size="sm">
      <tbody>
        <tr>
          <th>{posts.awardYear}</th>
          <th>{posts.category.en}</th>
          <th>{posts.categoryFullName.no}</th>
          <th>{posts.dateAwarded}</th>
          <th>{posts.prizeAmount}</th>
        </tr>
      </tbody>

  );
}
export default Details;
