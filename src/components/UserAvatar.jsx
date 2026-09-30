export default function UserAvatar({ user, size = "medium" }) {
    if (!user) {
      return null;
    }
  
    return (
      <img
        className={`user-avatar user-avatar-${size}`}
        src={user.avatar}
        alt={`${user.username} avatar`}
      />
    );
  }