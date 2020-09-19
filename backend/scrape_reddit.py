# Reference: https://praw.readthedocs.io/en/latest/
# !pip install praw

from pymongo import MongoClient
import praw
from praw.models import MoreComments


# Get 10 new posts from the COVID subreddit
# r/COVID
# Novel Coronavirus News, Analysis, Survival Stories, Etc.

reddit = praw.Reddit(client_id='uFDD9nuv5yHZJA',
                     client_secret='wKIFKijChGdG0XJyuTB2UIV8XMo',
                     user_agent='pct_reddit_news')


# Print Statements
new_posts = reddit.subreddit('COVID').new(limit=10)
post_num = 1
for post in new_posts:
    print("Post Number: ", post_num, "\n")
    print("Post ID: ", post.id, "\n")
    print("Post Title: ", post.title, "\n")
    print("Post Content: ", post.selftext, "\n")
    submission = reddit.submission(id=post.id)
    submission.comments.replace_more(limit=0)
    print("Comments: ")
    for comment in submission.comments.list():
        if isinstance(comment, MoreComments):
            continue
        print("== ", comment.body)
        for comment_replies in comment.replies:
            print("---", comment_replies.body)
    post_num += 1
    print("\n \n \n")


# Get subreddit data
    # Displays r/COVID posting rules
r_COVID = reddit.subreddit('COVID')
print(r_COVID.description)