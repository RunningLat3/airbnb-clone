import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteLitings";

import EmptyState from "../components/EmptyState";

import FavoritesClient from "./FavoritesClient";

const FavoritesPage = async () => {
  const favoriteListings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="Please login your airbnb account"
      />
    );

  if (favoriteListings.length === 0)
    return (
      <EmptyState
        title="No favorities found"
        subtitle="Looks like you have no favorite listings"
      />
    );

  return (
    <FavoritesClient
      favoriteListings={favoriteListings}
      currentUser={currentUser}
    />
  );
};

export default FavoritesPage;
