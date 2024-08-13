import os
import frontmatter
import re

def read_files():
    '''read all files in posts directory'''
    path = 'data/hugo/content/posts'
    files = os.listdir(path)
    for file in files:
        with open(f'{path}/{file}', 'r') as f:
            content = f.read()
            post = frontmatter.loads(content)            
            if post.metadata.get('photos'):
                print(post.metadata['photos'][0])
                '''find all markdown images in the post.content using regexp'''
                images = re.findall(r'!\[.*\]\((.*)\)', post.content)
                '''replace the image path with the new one'''                
                for image in images:
                    print(image)
                    if image in post.metadata['photos']:
                        post.content = post.content.replace(image, post.metadata['photos'][image])
                        print(post.content)    

                print('--')          



if __name__ == '__main__':
    read_files()