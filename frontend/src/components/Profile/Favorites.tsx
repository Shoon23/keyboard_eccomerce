import React, { useEffect, useState } from "react";
import { Circle, InfoCircle, CircleHalf } from "react-bootstrap-icons";

import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { iFavorite } from "../../types";
import FavoriteCard from "./FavoriteCard";
import { usePrivateApi } from "../../hooks/usePrivateApi";

interface Props {}

function Favorites({}: Props) {
  const { accessToken, favoritesId, clearUserDetails } = useAuthStore();
  const api = usePrivateApi(accessToken as string, false);
  const [favorites, setFavorites] = useState<Array<iFavorite>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchFavorites = async () => {
    try {
      const res = await api.get(`user/favorites/${favoritesId}`);

      setFavorites(res.data);
    } catch (error) {
      clearUserDetails();
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchFavorites();
    setIsLoading(false);
  }, []);

  return (
    <section className="h-[1000px] overflow-y-scroll bg-white md:h-full md:w-2/3">
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <CircleHalf className="animate-spin fill-sky-600 " size={50} />
        </div>
      ) : favorites.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <h1 className="text-3xl">No Favorites</h1>
        </div>
      ) : (
        favorites.map((favorite: iFavorite) => (
          <FavoriteCard
            key={favorite.favoriteItemId}
            setFavorites={setFavorites}
            favorite={favorite}
          />
        ))
      )}
    </section>
  );
}

export default Favorites;
