import re, glob, os

def renamer(files, pattern, replacement):
    for pathname in glob.glob(files):
        basename= os.path.basename(pathname)
        new_filename= re.sub(pattern, replacement, basename)
        if new_filename != basename:
            os.rename(
              pathname,
              os.path.join(os.path.dirname(pathname), new_filename))


import os
for root, dirs, files in os.walk(".", topdown=False):
   for name in files:
      print()
      pathname=os.path.join(root, name)
      basename= os.path.basename(pathname)
      new_filename= re.sub(r"^(.*)\.js$", r"\1.tsx", basename)
      os.rename(
              pathname,
              os.path.join(os.path.dirname(pathname), new_filename))
