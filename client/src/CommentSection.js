import React, { useState, useEffect } from 'react';
import './asests/css/CommentSection.css';

function CommentSection({ productId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [currentUser, setCurrentUser] = useState(null);

    // Lấy thông tin user từ localStorage khi component mount
    useEffect(() => {
        const userJson = localStorage.getItem('user');
        if (userJson) {
            setCurrentUser(JSON.parse(userJson));
        }
    }, []);

    // Fetch comments từ database
    useEffect(() => {
        fetchComments();
    }, [productId]);

    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:3000/comments/${productId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!currentUser) {
            alert('Vui lòng đăng nhập để bình luận');
            return;
        }

        if (!newComment.trim()) {
            alert('Vui lòng nhập nội dung bình luận');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ma_san_pham: productId,
                    ma_nguoi_dung: currentUser.ma_nguoi_dung,
                    noi_dung: newComment
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setNewComment('');
            fetchComments(); // Refresh comments after posting
        } catch (error) {
            console.error('Error posting comment:', error);
            alert('Không thể gửi bình luận. Vui lòng thử lại sau.');
        }
    };

    return (
        <div className="comments-section">
            <h3>Bình luận</h3>
            
            <form onSubmit={handleSubmit} className="comment-form">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Viết bình luận của bạn..."
                    rows="3"
                />
                <button type="submit">Gửi bình luận</button>
            </form>

            <div className="comments-list">
                {comments.map((comment) => (
                    <div key={comment.ma_binh_luan} className="comment">
                        <div className="comment-header">
                            <strong>{comment.ten_nguoi_dung}</strong>
                            <span>{new Date(comment.ngay_tao).toLocaleDateString()}</span>
                        </div>
                        <p>{comment.noi_dung}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommentSection;
