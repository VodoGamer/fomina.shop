"""product: add price

Revision ID: 62325545bf8a
Revises: 1ee94fafaa73
Create Date: 2023-07-19 10:48:04.898091

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '62325545bf8a'
down_revision = '1ee94fafaa73'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('product', sa.Column('price', sa.Integer(), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('product', 'price')
    # ### end Alembic commands ###
