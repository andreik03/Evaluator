# Evaluator

The objective of this project is to create a website with computer problems. (Reference: hackerrank.com, leetcode.com, pbinfo.ro, infoarena.ro)
The user must be able to run the code and display the output / error.
When the user thinks that he has a correct solution, he must be able to publish his code and it will be analyzed, then displaying its correctness.
Back-end will use Django and for front-end React.


For now, the goal is for the user to be able to run Python code.
For now, I need to find a way to run the Python code from the user in a safe way.

=============== Ideas for running Python safely ===============

-- In-built functions --
exec, eval: too unsafe, takes too much time to implement something decent
------------------------

--Sandboxed --
Really good article of the options available for sandboxing:
https://www.software.ac.uk/blog/2017-11-23-executing-python-code-submitted-web-service

To check the realiability of the sandbox, check this:
https://book.hacktricks.xyz/misc/basic-python/bypass-python-sandboxes

Ideas:

pysandbox: deprecated, link - https://github.com/vstinner/pysandbox

PyPy sandbox: unmaintained, link - https://doc.pypy.org/en/latest/sandbox.html

Docker: very good idea, hard to set up, could use multiple coding languages, link - https://www.docker.com/

epicbox: really good combination with Docker, link - https://pypi.org/project/epicbox/

--------------

-- Python in the browser --
Really good article about the options:
https://anvil.works/blog/python-in-the-browser-talk

They run in the browser, meaning that security is not concern and the execution is handled on the user's machine.

Ideas:

PyPyJS - python 2.7, unmaintained, 12mb script import, link - https://github.com/pypyjs

Brythorn - python 3.9.0, no imports, good idea, link - https://brython.info/

Skulpt - python 2.7, limited imports(?), link - http://skulpt.org/

Anvil - python 2.7(?), website builder, pay to remove sponsor header, link - https://anvil.works/

---------------------------

===============================================================


