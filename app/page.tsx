import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import { SafeListing } from "./types";
import ClientOnly from "./components/ClientOnly";

interface HomeProps {
  searchParams: IListingsParams;
}

const HomePage = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (!listings.length) {
    return <EmptyState showReset />;
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing: SafeListing) => {
            return (
              <ListingCard
                key={listing.id}
                currentUser={currentUser}
                data={listing}
              />
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
};

/* 
Server rendering usually happens in one place, so fetching data associated with a user needs to be known to be dynamic.
Dynamic routes occur after fetching some data, Next cannot directly generate the corresponding page or content, so the same needs to be specified dynamically.

in this case searchParams.userId is being flag as Dynamic server usage

to fix this we need to add the following line of code
export const dynamic = "force-dynamic"
*/
export const dynamic = "force-dynamic";
export default HomePage;
