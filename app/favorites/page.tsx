import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteLitings";
import ClientOnly from "../components/ClientOnly";

import EmptyState from "../components/EmptyState";

import FavoritesClient from "./FavoritesClient";

const FavoritesPage = async () => {
  const favoriteListings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login your airbnb account"
        />
      </ClientOnly>
    );

  if (favoriteListings.length === 0)
    return (
      <ClientOnly>
        <EmptyState
          title="No favorities found"
          subtitle="Looks like you have no favorite listings"
        />
      </ClientOnly>
    );

  return (
    <ClientOnly>
      <FavoritesClient
        favoriteListings={favoriteListings}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default FavoritesPage;
