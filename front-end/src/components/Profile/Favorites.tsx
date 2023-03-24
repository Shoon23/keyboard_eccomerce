import React, { useEffect, useState } from "react";
import { X } from "react-bootstrap-icons";
import { apiPrivate } from "../../utils/axiosBase";
import { useInterceptors } from "../../hooks/useInterceptors";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { iFavorite } from "../../types";
import FavoriteCard from "./FavoriteCard";

interface Props {}

function Favorites({}: Props) {
  const { accessToken, favoritesId, clearUserDetails } = useAuthStore();
  const axios = apiPrivate(accessToken as string);
  const api = useInterceptors(axios, accessToken as string);
  const [favorites, setFavorites] = useState<Array<iFavorite>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchFavorites = async () => {
    try {
      const res = await api.get(`user/favorites/${favoritesId}`);
      console.log(res.data);
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
        <div className="">Loadinngg...</div>
      ) : favorites.length === 0 ? (
        <div className="">No Favorites</div>
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
