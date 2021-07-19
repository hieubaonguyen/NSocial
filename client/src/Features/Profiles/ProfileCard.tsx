import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";
import { IProfile } from "../../App/Models/Profile";

interface IProps {
  profile: IProfile;
}

const ProfileCard: React.FC<IProps> = ({ profile }) => {
  return (
    <Card as={Link} to={`/profile/${profile.userName}`}>
      <Image src={profile.image || "/assets/user.png"} />
      <Card.Content>
        <Card.Header>{profile.displayName}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <div>
          <Icon name="user" />
          {profile.followersCount} Followers
        </div>
      </Card.Content>
    </Card>
  );
};

export default observer(ProfileCard);
