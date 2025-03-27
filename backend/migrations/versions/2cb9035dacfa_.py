"""

Revision ID: 2cb9035dacfa
Revises: 4b2fe57e3605
Create Date: 2025-03-14 20:49:43.928304

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2cb9035dacfa'
down_revision = '4b2fe57e3605'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('sessionid_table', schema=None) as batch_op:
        batch_op.alter_column('session_id',
               existing_type=sa.BIGINT(),
               server_default=sa.text('gen_random_uuid()'),
               type_=sa.Uuid(),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('sessionid_table', schema=None) as batch_op:
        batch_op.alter_column('session_id',
               existing_type=sa.Uuid(),
               server_default=sa.Identity(always=True, start=1, increment=1, minvalue=1, maxvalue=9223372036854775807, cycle=False, cache=1),
               type_=sa.BIGINT(),
               existing_nullable=False)

    # ### end Alembic commands ###
