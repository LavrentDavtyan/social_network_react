import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { IPost } from '../helpers/types';
import { handleGetPost, handleMakeComment } from '../helpers/api';
import { BASE } from '../helpers/default';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IProps {
  isOpen: boolean;
  close: () => void;
  postId: number;
}

export function Preview({ isOpen, close, postId }: IProps) {
  const [post, setPost] = useState<IPost | null>(null);
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    if (postId) {
      handleGetPost(postId).then((response) => {
        setPost(response.payload as IPost);
      });
    }
  }, [postId]);

  const makeComment = () => {
    if (comment.trim() !== '') {
      handleMakeComment(postId, comment)
        .then((newComment) => {
          if (post) {
            setPost({
              ...post,
              comments: [...post.comments, newComment.payload],
            });
          }
          setComment(''); // Clear the input after submitting
        })
        .catch((error) => {
          console.error('Failed to submit comment:', error);
        });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      makeComment();
    }
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="row">
            <div className="col-9">
              <img src={BASE + post?.picture} alt="Post image" style={{ width: '100%' }} />
            </div>
            <div className="col-3">
              <b>
                {post?.likes.length || 0} likes, {post?.comments.length || 0} comments
              </b>
              <p>Likes:</p>
              {post?.likes.map((like) => (
                <p key={like.id}>
                  <a href="#">
                    <img className="like-image" src={BASE + like.picture} alt="User profile" />
                    {like.name} {like.surname}
                  </a>
                </p>
              ))}
              <p>Comments:</p>
              {post?.comments.map((comment) => (
                <p key={comment.id}>
                  {comment.name} says: <br />
                  {comment.content}
                </p>
              ))}
            </div>
          </div>
          <div className="row">
            <div className="col-9"></div>
            <div className="col-3">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Write a comment..."
              />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
