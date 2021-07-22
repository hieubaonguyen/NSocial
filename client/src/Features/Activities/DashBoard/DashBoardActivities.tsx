import { Grid, GridColumn, Loader } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { RootStoreContext } from "../../../App/stores/RootStore";
import InfiniteScroll from "react-infinite-scroll-component";
import ActivityFilter from "./ActivityFilter";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";

const style = {
  overflow: "hidden",
};

const DashBoardActivities = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadActivities,
    loadingInitial,
    setPage,
    page,
    getCountActivities,
    getTotalPage,
  } = rootStore.activityStore;
  const [loadingNext, setloadingNext] = useState<boolean>(false);

  const handleGetNext = () => {
    setloadingNext(true);
    setPage(page + 1);
    loadActivities().then(() => setloadingNext(false));
  };

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  return (
    <Grid>
      <GridColumn width={10}>
        {loadingInitial && page === 0 ? (
          <ActivityListItemPlaceholder />
        ) : (
          <InfiniteScroll
            style={style}
            dataLength={getCountActivities}
            next={handleGetNext}
            hasMore={!loadingNext && page + 1 < getTotalPage}
            loader={false}
          >
            <ActivityList />
          </InfiniteScroll>
        )}
      </GridColumn>
      <GridColumn width={6}>
        <ActivityFilter />
      </GridColumn>
      <GridColumn width={10}>
        <Loader active={loadingNext} />
      </GridColumn>
    </Grid>
  );
};

export default observer(DashBoardActivities);
