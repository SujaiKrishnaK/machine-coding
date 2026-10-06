export async function getServerSideProps(context) {
  const { req } = context; 
  const token = req.cookies.token; // Read incoming request details directly

  const res = await fetch('https://example.com', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();

  return { props: { data } };
}
export async function getStaticProps() {
  const res = await fetch('https://example.com');
  const products = await res.json();

  return {
    props: { products }, // Passed to the page component as props
    revalidate: 60,      // Optional: Regenerates page every 60s (Incremental Static Regeneration)
  };
}

export async function getStaticPaths() {
  const res = await fetch('https://example.com');
  const products = await res.json();

  // Map paths to the precise parameter names required by the folder structure
  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: false }; // fallback: false returns 404 for missing paths
}
